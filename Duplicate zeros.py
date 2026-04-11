# Duplicate zeros
class Solution:
    def duplicateZeros(self, arr: List[int]) -> None:
        n = len(arr)
        zeros = arr.count(0)
        i = n - 1 # last index
        j = n + zeros - 1 # imaginary index
        while i >= 0: # start accessing no.s 1 by 1
            if j < n: # if no zeros
                arr[j] = arr[i] # end of extension = i
        
            if arr[i] == 0: # if found a zero
                j -= 1 # reduce 1 from extension demand
                if j < n: # if extension used, then place zero
                    arr[j] = 0
            i -= 1
            j -=1
        return arr
