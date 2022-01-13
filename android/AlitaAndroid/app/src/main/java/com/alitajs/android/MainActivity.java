package com.alitajs.android;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.alitajs.capacitorandroid.AlitaJsActivity;

public class MainActivity extends AppCompatActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    findViewById(R.id.main_button).setOnClickListener(new View.OnClickListener() {
      @Override
      public void onClick(View view) {
        Intent intent = new Intent(MainActivity.this, AlitaJsActivity.class);
        intent.putExtra("serverUrl", "http://10.128.3.95:8000");
        startActivity(intent);
      }
    });
  }
}
