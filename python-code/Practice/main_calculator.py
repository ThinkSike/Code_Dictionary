# all imports
from PyQt5.QtWidgets import QApplication, QWidget, QLineEdit, QPushButton, QVBoxLayout, QGridLayout, QHBoxLayout

class Cal_app(QWidget):
    def __init__(self):
        super().__init__()
    
        # app setting
        self.setWindowTitle("Calculator")
        self.resize(250, 300)

        # all objects/ widgets
        self.text_box = QLineEdit()
        self.grid = QGridLayout()

        self.buttons = [
                        "7", "8", "9", "/", 
                        "4", "5", "6", "*", 
                        "1", "2", "3", "-", 
                        "0", ".", "=", "+"
                        ]
        
        row = col = 0
        for button in self.buttons:
            btn = QPushButton(button)
            btn.setFixedSize(40, 40)
            btn.clicked.connect(self.btn_click)
            if button == "=":
                btn.setStyleSheet("background-color: lightgreen")
            # elif button == "Del":
            #     btn.setStyleSheet("background-color: lightcoral")
            # elif button == "Clear":
            #     btn.setStyleSheet("background-color: lightblue")
            # else:
            #     btn.setStyleSheet("background-color: darkgray")
            self.grid.addWidget(btn, row, col)  
            col += 1
            if col > 3:
                col = 0
                row += 1

        self.clear = QPushButton("Clear")
        self.delete = QPushButton("Del") 
         # design layout
        master_layout = QVBoxLayout()
        master_layout.addWidget(self.text_box)
        master_layout.addLayout(self.grid)

        button_row = QHBoxLayout()
        button_row.addWidget(self.delete)
        button_row.addWidget(self.clear)

        master_layout.addLayout(button_row)
        self.setLayout(master_layout)
        self.clear.clicked.connect(self.btn_click)
        self.delete.clicked.connect(self.btn_click)
        
    def btn_click(self):
        button = app.sender()
        text = button.text()
        
        if text == "=":
            symbol = self.text_box.text()
            try:
                res = eval(symbol)
                self.text_box.setText(str(res))
            except Exception as e:
                self.text_box.setText("Error: " + str(e))
        elif text == "Del":
            current_text = self.text_box.text()
            self.text_box.setText(current_text[:-1])
        elif text == "Clear":
            self.text_box.clear()
        else:
            current_text = self.text_box.text()
            self.text_box.setText(current_text + text)        
    
    
            
if __name__ == "__main__":
    app = QApplication([])
    main_window = Cal_app()
    main_window.show()
    # show/ run
    app.exec_()