package com.pieceofshidsriapp

import android.app.NotificationChannel;
import androidx.core.app.NotificationCompat;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.content.Intent
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import org.devio.rn.splashscreen.SplashScreen; // here
import com.emekalites.react.alarm.notification.BundleJSONConverter;
import com.facebook.react.modules.core.DeviceEventManagerModule
import org.json.JSONObject;

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "PieceofshidSriapp"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate {
    SplashScreen.show(this) // Show SplashScreen here
    return DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
      try {
          val bundle: Bundle? = intent.extras
          if (bundle != null) {
              val data = BundleJSONConverter.convertToJSON(bundle)
              getReactInstanceManager().currentReactContext
                  ?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                  ?.emit("OnNotificationOpened", data.toString())
          }
      } catch (e: Exception) {
          System.err.println("Exception when handling notification opened. $e")
      }
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        createNotificationChannel(
            "alarm-channel",
            "PieceofshidSriapp",
            "alarm"
        )
    }
  }

  private fun createNotificationChannel(channelId: String, appName: String, soundResourceName: String) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          val notificationChannel = NotificationChannel(
                  channelId,
                  appName,
                  NotificationManager.IMPORTANCE_HIGH
          )
          notificationChannel.canShowBadge()
          notificationChannel.description = ""

          val att = AudioAttributes.Builder()
                  .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                  .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                  .build()

          val soundUri = Uri.parse("${ContentResolver.SCHEME_ANDROID_RESOURCE}://${packageName}/raw/$soundResourceName")
          notificationChannel.setSound(soundUri, att)

          notificationChannel.enableVibration(true)
          notificationChannel.vibrationPattern = longArrayOf(400, 400)
          notificationChannel.lockscreenVisibility = NotificationCompat.VISIBILITY_PUBLIC

          val manager = getSystemService(NotificationManager::class.java)
          manager?.createNotificationChannel(notificationChannel)
      }
  }
}
