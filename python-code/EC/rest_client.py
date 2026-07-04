import requests
import time

URL = "http://127.0.0.1:5000/data"
NUM_REQUESTS = 50

latencies = []

print("Sending REST requests...")

start_total = time.time()

for i in range(NUM_REQUESTS):
    payload = {"message": f"test {i}"}

    start = time.time()
    response = requests.post(URL, json=payload)
    end = time.time()

    latencies.append(end - start)

end_total = time.time()

total_time = end_total - start_total
avg_latency = sum(latencies) / len(latencies)
throughput = NUM_REQUESTS / total_time

print("\nREST Results:")
print(f"Total Time: {total_time:.4f} sec")
print(f"Average Latency: {avg_latency:.4f} sec")
print(f"Throughput: {throughput:.2f} req/sec")