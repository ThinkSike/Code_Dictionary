import paho.mqtt.client as mqtt
import time

client = mqtt.Client()
client.connect("localhost", 1883, 60)

NUM_MESSAGES = 50
latencies = []

print("Publishing MQTT messages...")

for i in range(NUM_MESSAGES):
    payload = f"message {i}"

    start = time.time()
    client.publish("edge/test", payload)
    end = time.time()

    latencies.append(end - start)
    time.sleep(0.01)  # small delay

avg_latency = sum(latencies) / len(latencies)

print("\nMQTT Publisher Results:")
print(f"Average Publish Latency: {avg_latency:.6f} sec")