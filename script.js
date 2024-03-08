window.onload = function() {
    // Array of video IDs and descriptions
    var videos = [
        { id: "VIDEO_ID_1", description: "Description for Video 1" },
        { id: "VIDEO_ID_2", description: "Description for Video 2" },
        { id: "VIDEO_ID_3", description: "Description for Video 3" },
        { id: "VIDEO_ID_4", description: "Description for Video 4" },
        { id: "VIDEO_ID_5", description: "Description for Video 5" },
        { id: "VIDEO_ID_6", description: "Description for Video 6" }
    ];

    // Function to create video elements
    function createVideoElement(video) {
        var videoDiv = document.createElement("div");
        videoDiv.classList.add("video");
        var iframe = document.createElement("iframe");
        iframe.setAttribute("src", "https://www.youtube.com/embed/" + video.id);
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("allowfullscreen", "");
        var description = document.createElement("p");
        description.textContent = video.description;
        videoDiv.appendChild(iframe);
        videoDiv.appendChild(description);
        return videoDiv;
    }

    // Display all videos
    var videoListContainer = document.getElementById("videoList");
    videos.forEach(function(video) {
        var videoElement = createVideoElement(video);
        videoListContainer.appendChild(videoElement);
    });
};
