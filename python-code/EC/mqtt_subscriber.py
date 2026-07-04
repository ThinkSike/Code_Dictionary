import paho.mqtt.client as mqtt
import time

message_count = 0
start_time = None
TARGET_MESSAGES = 50

def on_message(client, userdata, msg):
    global message_count, start_time

    if message_count == 0:
        start_time = time.time()

    message_count += 1
    print(f"Received: {msg.payload.decode()}")

    if message_count == TARGET_MESSAGES:
        end_time = time.time()
        total_time = end_time - start_time
        throughput = TARGET_MESSAGES / total_time

        print("\nMQTT Results:")
        print(f"Total Time: {total_time:.4f} sec")
        print(f"Throughput: {throughput:.2f} msg/sec")

client = mqtt.Client()
client.connect("localhost", 1883, 60)

client.subscribe("edge/test")
client.on_message = on_message

print("MQTT Subscriber Started...")
client.loop_forever()