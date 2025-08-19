package com.bluetooth_scanner;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.bluetooth.BluetoothDevice;
import android.content.pm.PackageManager;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class BluetoothReceiver extends BroadcastReceiver {
    private static final String TAG = "BluetoothReceiver";

    private final ReactApplicationContext reactContext;

    public BluetoothReceiver(ReactApplicationContext context) {
        this.reactContext = context;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();

        if (BluetoothDevice.ACTION_ACL_CONNECTED.equals(action)) {
            BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
            if (device != null) {
//                Log.d(TAG, "Device connected: " + device.getName());

                sendEvent("BluetoothConnected", device.getName());
                showNotification(context, "Connected to (ido)" + device.getName());
            }
        } else if (BluetoothDevice.ACTION_ACL_DISCONNECTED.equals(action)) {
            BluetoothDevice device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
            if (device != null) {
//                Log.d(TAG, "Device disconnected: " + device.getName());

                sendEvent("BluetoothDisconnected", device.getName());
                showNotification(context, "Disconnected from (ido)" + device.getName());
            }
        }
    }

    private void sendEvent(String eventName, String deviceName) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, deviceName);
    }

    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            String channelId = "bluetooth_channel";
            String channelName = "Bluetooth Events";
            String description = "Notifications for Bluetooth connection events";
            int importance = NotificationManager.IMPORTANCE_DEFAULT;

            NotificationChannel channel = new NotificationChannel(channelId, channelName, importance);
            channel.setDescription(description);

            NotificationManager manager = context.getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }
    }

    private void showNotification(Context context, String message) {
        String channelId = "bluetooth_channel";

        // Create the channel (needed for Android 8+)
        createNotificationChannel(context);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, channelId)
                .setSmallIcon(android.R.drawable.stat_sys_data_bluetooth) // default icon
                .setContentTitle("Bluetooth Event")
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);

        NotificationManagerCompat manager = NotificationManagerCompat.from(context);

        if (ActivityCompat.checkSelfPermission(context, android.Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            // Permission not granted
            return;
        }

        manager.notify((int) System.currentTimeMillis(), builder.build());
    }
}
