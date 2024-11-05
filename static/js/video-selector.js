const videoCategory = document.getElementById('videoCategory');
const videoPlayer = document.getElementById('videoPlayer');
const prevButton = document.getElementById('prevVideo');
const nextButton = document.getElementById('nextVideo');

let currentVideoIndex = 0;

const videos = {
    'occlusion': [
        './static/assets/occlusion/small/GX010199_105_synchronized_small.mp4',
        './static/assets/occlusion/small/GX010264_0_synchronized_small.mp4',
        './static/assets/occlusion/small/GX010267_3_synchronized_small.mp4',
        './static/assets/occlusion/small/GX010274_10_synchronized_small.mp4',
        './static/assets/occlusion/small/GX010295_30_synchronized_small.mp4',
        './static/assets/occlusion/small/GX010419_32_synchronized_small.mp4',
        './static/assets/occlusion/small/GX010444_58_synchronized_small.mp4',
        './static/assets/occlusion/small/GX010445_59_synchronized_small.mp4'
    ],
    'peduncle': [
        './static/assets/peduncle/small/GX010174_80_synchronized_small.mp4',
        './static/assets/peduncle/small/GX010197_103_synchronized_small.mp4',
        './static/assets/peduncle/small/GX010264_0_synchronized_small.mp4',
        './static/assets/peduncle/small/GX010267_3_synchronized_small.mp4',
        './static/assets/peduncle/small/GX010306_41_synchronized_small.mp4',
        './static/assets/peduncle/small/GX010346_72_synchronized_small.mp4',
        './static/assets/peduncle/small/GX010365_91_synchronized_small.mp4'
    ],
    'recovery': [
        './static/assets/recovery_behavior/small/GX010264_0_synchronized_small.mp4',
        './static/assets/recovery_behavior/small/GX010265_1_synchronized_small.mp4',
        './static/assets/recovery_behavior/small/GX010273_9_synchronized_small.mp4',
        './static/assets/recovery_behavior/small/GX010293_28_synchronized_small.mp4',
        './static/assets/recovery_behavior/small/GX010357_83_synchronized_small.mp4',
        './static/assets/recovery_behavior/small/GX010418_31_synchronized_small.mp4'
    ],
    'lighting': [
        './static/assets/lighting/small/GX010229_135_synchronized_small.mp4',
        './static/assets/lighting/small/GX010263_168_synchronized_small.mp4',
        './static/assets/lighting/small/GX010356_82_synchronized_small.mp4',
        './static/assets/lighting/small/GX010391_5_synchronized_small.mp4'
    ],
    'multipepper': [
        './static/assets/multipepper/small/GX010229_135_synchronized_small.mp4',
        './static/assets/multipepper/small/GX010236_142_synchronized_small.mp4',
        './static/assets/multipepper/small/GX010356_82_synchronized_small.mp4',
        './static/assets/multipepper/small/GX010381_107_synchronized_small.mp4'
    ],
    'easy': [
        './static/assets/easy/small/GX010144_51_synchronized_small.mp4',
        './static/assets/easy/small/GX010185_91_synchronized_small.mp4',
        './static/assets/easy/small/GX010195_101_synchronized_small.mp4',
        './static/assets/easy/small/GX010216_122_synchronized_small.mp4',
        './static/assets/easy/small/GX010222_128_synchronized_small.mp4',
        './static/assets/easy/small/GX010223_129_synchronized_small.mp4',
        './static/assets/easy/small/GX010232_138_synchronized_small.mp4',
        './static/assets/easy/small/GX010259_164_synchronized_small.mp4',
        './static/assets/easy/small/GX010262_167_synchronized_small.mp4',
        './static/assets/easy/small/GX010285_20_synchronized_small.mp4',
        './static/assets/easy/small/GX010310_45_synchronized_small.mp4',
        './static/assets/easy/small/GX010338_64_synchronized_small.mp4',
        './static/assets/easy/small/GX010358_84_synchronized_small.mp4',
        './static/assets/easy/small/GX010366_92_synchronized_small.mp4',
        './static/assets/easy/small/GX010370_96_synchronized_small.mp4',
        './static/assets/easy/small/GX010382_108_synchronized_small.mp4',
        './static/assets/easy/small/GX010386_0_synchronized_small.mp4',
        './static/assets/easy/small/GX010404_18_synchronized_small.mp4',
        './static/assets/easy/small/GX010422_35_synchronized_small.mp4',
        './static/assets/easy/small/GX010429_42_synchronized_small.mp4',
        './static/assets/easy/small/GX010440_53_synchronized_small.mp4',
        './static/assets/easy/small/GX010453_67_synchronized_small.mp4'
    ]
};

function playVideo(category, index) {
    if (videos[category] && videos[category][index]) {
        videoPlayer.src = videos[category][index];
        videoPlayer.load();
        videoPlayer.play();
        updateNavigationButtons();
    }
}

function updateNavigationButtons() {
    const selectedCategory = videoCategory.value;
    const hasVideos = selectedCategory && videos[selectedCategory] && videos[selectedCategory].length > 0;
    prevButton.disabled = !hasVideos;
    nextButton.disabled = !hasVideos;
}

videoCategory.addEventListener('change', function() {
    const selectedCategory = this.value;
    if (selectedCategory && videos[selectedCategory]) {
        currentVideoIndex = 0;  // Reset index when changing category
        playVideo(selectedCategory, currentVideoIndex);
    } else {
        videoPlayer.src = '';
        updateNavigationButtons();
    }
});

function playNextVideo() {
    const selectedCategory = videoCategory.value;
    if (selectedCategory && videos[selectedCategory]) {
        currentVideoIndex = (currentVideoIndex + 1) % videos[selectedCategory].length;
        playVideo(selectedCategory, currentVideoIndex);
    }
}

function playPreviousVideo() {
    const selectedCategory = videoCategory.value;
    if (selectedCategory && videos[selectedCategory]) {
        currentVideoIndex = (currentVideoIndex - 1 + videos[selectedCategory].length) % videos[selectedCategory].length;
        playVideo(selectedCategory, currentVideoIndex);
    }
}

prevButton.addEventListener('click', playPreviousVideo);
nextButton.addEventListener('click', playNextVideo);

// Automatically select a category and start playing a video
function autoPlayInitialVideo() {
    const defaultCategory = 'recovery';  // Change this to your preferred default category
    videoCategory.value = defaultCategory;
    currentVideoIndex = 0;
    playVideo(defaultCategory, currentVideoIndex);
}

// Call this function when the page loads
window.addEventListener('load', autoPlayInitialVideo);