(function () {
  'use strict';
  const app = angular.module('whiteboardApp', []);

  app.factory('api', ['$http', function ($http) {
    return {
      getBoard: (id) => $http.get(`/api/boards/${encodeURIComponent(id)}`).then(r => r.data),
      clearBoard: (id) => $http.post(`/api/boards/${encodeURIComponent(id)}/clear`),
      undoBoard: (id) => $http.post(`/api/boards/${encodeURIComponent(id)}/undo`)
    };
  }]);

  app.controller('BoardCtrl', ['$scope', '$window', 'api', function ($scope, $window, api) {
    const url = new URL($window.location.href);
    const boardId = url.searchParams.get('board') || 'default';
    $scope.boardId = boardId;
    $scope.color = '#000000';
    $scope.width = 3;
    $scope.shareUrl = `${location.origin}/?board=${encodeURIComponent(boardId)}`;

    const canvas = document.getElementById('board');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight - 56;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = Math.floor(cssW * dpr);
      canvas.height = Math.floor(cssH * dpr);
      ctx.scale(dpr, dpr);
      redrawAll(); // re-render strokes after resize
    }

    window.addEventListener('resize', resizeCanvas);

    const socket = io();
    socket.emit('join', boardId);

    function drawLineLocal(x0, y0, x1, y1, color, width) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
    }

    let strokesCache = []; // used for redraw on resize/clear/undo

    function redrawAll() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // account for the dpr scaling; we already scaled context, so draw with CSS pixels
      strokesCache.forEach(s => drawLineLocal(s.x0, s.y0, s.x1, s.y1, s.color, s.width));
    }

    // Mouse/touch drawing
    let drawing = false;
    let last = null;

    function getPos(e) {
      if (e.touches && e.touches.length) {
        const rect = canvas.getBoundingClientRect();
        return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
      } else {
        const rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    }

    function startDraw(e) {
      e.preventDefault();
      drawing = true;
      last = getPos(e);
    }

    function moveDraw(e) {
      if (!drawing) return;
      const p = getPos(e);
      const line = { x0: last.x, y0: last.y, x1: p.x, y1: p.y, color: $scope.color, width: Number($scope.width) || 3 };
      drawLineLocal(line.x0, line.y0, line.x1, line.y1, line.color, line.width);
      strokesCache.push(line);
      socket.emit('draw-line', { boardId, line });
      last = p;
    }

    function endDraw() {
      drawing = false;
      last = null;
    }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', moveDraw);
    window.addEventListener('mouseup', endDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', moveDraw, { passive: false });
    window.addEventListener('touchend', endDraw);

    // Socket events
    socket.on('joined', () => {
      // Load persisted strokes on join
      api.getBoard(boardId).then((board) => {
        strokesCache = (board.strokes || []).map(s => ({
          x0: s.x0, y0: s.y0, x1: s.x1, y1: s.y1, color: s.color, width: s.width
        }));
        resizeCanvas();
      });
    });

    socket.on('draw-line', ({ line }) => {
      strokesCache.push(line);
      drawLineLocal(line.x0, line.y0, line.x1, line.y1, line.color, line.width);
    });

    socket.on('clear', () => {
      strokesCache = [];
      redrawAll();
    });

    socket.on('undo-last', () => {
      strokesCache.pop();
      redrawAll();
    });

    // UI actions
    $scope.clear = function () {
      socket.emit('clear', { boardId });
      api.clearBoard(boardId);
    };

    $scope.undo = function () {
      socket.emit('undo-last', { boardId });
      api.undoBoard(boardId);
    };

    // Init
    resizeCanvas();
  }]);
})();
