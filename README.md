# AWS lambda practice

24-hour-video (web app)

1. Setting 
    1-1. S3 buckets (video-upload, video-transcoded) [ create two buckets for video ]
    1-2. video-upload ---(Elastic Transcoder)---> video-transcoded [ pipeline setting ]
    1-3. Need transcoding [Lambda function!](../transcode-video)

2. Create Web app
    1-1 use template (use jQuery)
    1-2 make [Lambda function](../24-hour-video)