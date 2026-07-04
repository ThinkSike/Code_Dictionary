arr = [1, 4, 3, 2, 0]
len_ = len(arr)
def bubble_sort(arr):
    step_count = {"comparision": 0, "swaps": 0}

    for i in range(len_):
        
        for j in range(0, len_ - i - 1):
            step_count["comparision"] += 1
            if arr[j] > arr[j + 1]:
                arr[j + 1], arr[j] = arr[j], arr[j + 1]
                step_count["swaps"] += 1       
        print(arr)
        i, j  = i + 1, j + 1

    print("Input size: ", len(arr))
    print(f"Counts: {step_count}")

