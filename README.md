# AWS lambda practice

24-hour-video (web app)<br>

1. Setting <br>
    1-1. S3 buckets (video-upload, video-transcoded) [ create two buckets for video ]<br>
    1-2. video-upload ---(Elastic Transcoder)---> video-transcoded [ pipeline setting ]<br>
    1-3. Need transcoding [Lambda function!](../transcode-video)<br>

2. Create Web app<br>
    1-1 use template (use jQuery)<br>
    1-2 make [Lambda function](../24-hour-video)<br>