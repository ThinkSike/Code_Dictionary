def schedule_tasks(deadlines, profits):
    n = len(deadlines)
    if n == 0:
        return []
    deadlines = [min(d, n) for d in deadlines]
    jobs = sorted([(deadlines[i], profits[i], i) for i in range(n)], key=lambda x: -x[1])
    parent = list(range(n + 1))
    
    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]
    
    slot = [None] * (n + 1)
    
    for d, p, idx in jobs:
        s = find(d)
        if s != 0:
            slot[s] = idx
            parent[s] = find(s - 1)
    
    return [slot[i] for i in range(1, n + 1) if slot[i] is not None]


if __name__ == "__main__":
    # Hardcoded input: deadlines and profits for jobs
    deadlines = [2, 1, 2, 1, 3]
    profits = [100, 19, 27, 25, 15]
    scheduled_jobs = schedule_tasks(deadlines, profits)
    print("Scheduled job indices (0-based):", scheduled_jobs)
    print("Profits of scheduled jobs:", profits)
