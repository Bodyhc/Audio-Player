	const audio = document.querySelector('.myaudio');
	const playButton = document.getElementById('playButton');
	const btnmuted = document.getElementById('muted');
	const playButtonIcon = document.getElementById('i');
	const backwardButton = document.getElementById('backwardButton');
	const nextButton = document.getElementById('next');
	const backButton = document.getElementById('back');
	const forwardButton = document.getElementById('forwardButton');
	const progressBar = document.getElementById('progressBar');
	let currentSongDiv = null;
	let userHasInteracted = false;
	let currentSongIndex = 0;
		


	const songs = [{
			src: 'Amr Diab...Aghla Min Omry _ عمرو دياب...اغلى من عمري(MP3_160K)',
			title: 'Amr Diab Habibi Aghla Min Omry _ حبيبي اغلى من عمري',
			duration: '4:54'
		},
		{
			src: 'Amr Diab - Wala Ala Balo _ Official Music Video _ عمرو دياب - ولا على باله(MP3_160K)',
			title: 'Amr Diab - Wala Ala Balo _ عمرو دياب - ولا على باله',
			duration: '5:05'
		},
		{
			src: 'Amr Diab _ Wahashtiny _ عمرو دياب _ وحشتيني(MP3_160K)',
			title: 'Amr Diab _ Wahashtiny _ وحشتيني',
			duration: '3:57'
		},
		{
			src: 'Amr Diab ... Khalik Maaya _ عمرو دياب ... خليك معايا(MP3_160K)',
			title: 'Amr Diab ... Khalik Maaya _ عمرو دياب - خليك معايا',
			duration: '3:52'
		},
		{
			src: 'Tamer Hosny _ent_akhtyar_-_mn_fylm_bhbk',
			title: 'Tamer Hosny _ent_akhtyar_-_mn_fylm_bhbk ',
			duration: '2:50'
		},
		{
			src: 'Tamer Hosny hermon elsada - هرمون السعاده',
			title: 'Tamer Hosny hermon elsada - هرمون السعاده',
			duration: '3:12'
		},
		{
			src: 'Albumaty.Com_Tamer Hosny_htgwzk_-_mn_fylm_bhbk',
			title: 'Albumaty.Com_Tamer Hosny_htgwzk_',
			duration: '3:05'
		},
		{
			src: 'Sherine El_Watar_El_Hassas',
			title: 'Sherine El_Watar_El_Hassas',
			duration: '4:21'
		},
		{
			src: 'Haifa Wahbe El_WaWa',
			title: 'Haifa Wahbe El_WaWa',
			duration: '3:00'
		},
		{
			src: 'Tamer Hosny Khontek_Embareh',
			title: 'Tamer Hosny Khontek_Embareh',
			duration: '3:44'
		},
		{
			src: 'Elissa_alysa_hlaly',
			title: 'Elissa_alysa_hlaly',
			duration: '4:06'
		},
		{
			src: 'hamaki',
			title: 'Hamakis بنفارق حاجات جوانا',
			duration: '4:06'
		},
		{
			src: 'Tamer Ashour - Haygely Mawgow3 _ تامر عاشور - هيجيلي موجوع(MP3_160K)',
			title: 'Tamer Ashour - Haygely Mawgow3  - هيجيلي موجوع',
			duration: '4:05'
		},
		{
			src: 'Mostafa Qamer السود عيونه',
			title: 'Mostafa Qamer السود عيونه',
			duration: '4:04'
		},
		{
			src: 'Ramy Gamal lsh_alklam_zalan',
			title: 'Ramy Gamal lsh_alklam_zalan',
			duration: '6:19'
		},
		{
			src: 'Lazaza-Ramy Sabry MaTb3aa.Com',
			title: 'Lazaza-Ramy Sabry MaTb3aa.Com',
			duration: '2:43'
		},
		{
			src: 'Gald.ElZat-Mostafa Hagag MaTb3aa.Com',
			title: 'Gald.ElZat-Mostafa Hagag MaTb3aa.Com',
			duration: '4:02'
		},
		//... (other song objects)
	];
console.log(songs.length)
	playButton.addEventListener('click', function() {
		if (audio.paused) {
			audio.play();
			playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
		} else {
			audio.pause();
			playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
		}
	});

	btnmuted.addEventListener('click', () => {
		if (audio.volume === 0) {
			audio.volume = 1;
			btnmuted.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
		} else {
			audio.volume = 0;
			btnmuted.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
		}
	});

	backwardButton.addEventListener('click', function() {
		audio.currentTime -= 10; // Move 10 seconds backward
	});

	forwardButton.addEventListener('click', function() {
		audio.currentTime += 10; // Move 10 seconds forward
	});

	progressBar.addEventListener('click', function(e) {
		const progressWidth = this.offsetWidth; // Width of the progress bar
		const clickX = e.offsetX; // Click position relative to the progress bar
		const duration = audio.duration;
		const newTime = (clickX / progressWidth) * duration; // Calculate the new time based on the click position
		audio.currentTime = newTime; // Set the new time for the audio
	});

	audio.addEventListener('timeupdate', function() {
		if (audio.duration) {
			const currentTime = audio.currentTime;
			const duration = audio.duration;
			const progress = (currentTime / duration) * 100;
			progressBar.value = progress;
		}
	});

	audio.addEventListener('ended', function() {
		playNextSong();
	});


	songs.forEach(function(song, index) {
		const songDiv = document.createElement('div');
		songDiv.className = 'mysong';

		const titleElement = document.createElement('p');
		titleElement.textContent = song.title;
		songDiv.appendChild(titleElement);

		const durationElement = document.createElement('p');
		durationElement.textContent = song.duration;
		durationElement.className = 'time'
		songDiv.appendChild(durationElement);

		songDiv.addEventListener('click', function() {
			// Update the audio source and play
			audio.src = `soungs/${song.src}.mp3`;
			audio.play();

			// Update the song index and play button
			currentSongIndex = index;
			updatePlayButton();

			// Update the current song div
			if (currentSongDiv) {
				currentSongDiv.classList.remove('current-song');
			}
			currentSongDiv = songDiv;
			currentSongDiv.classList.add('current-song');
		});

		songsContainer.appendChild(songDiv);
	});

	function updatePlayButton() {
		if (audio.paused) {
			playButton.innerHTML = '<i class="fa-solid fa-play"></i>';
		} else {
			playButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
		}
	}

	function updateCurrentSongDiv() {
		if (currentSongDiv) {
			currentSongDiv.classList.remove('current-song');
		}
		currentSongDiv = songsContainer.children[currentSongIndex];
		currentSongDiv.classList.add('current-song');
	}

	backButton.addEventListener('click', function() {
		currentSongIndex--;
		if (currentSongIndex < 0) {
			currentSongIndex = songs.length - 1;
		}
		updateSong();
	});

	nextButton.addEventListener('click', function() {
		currentSongIndex++;
		if (currentSongIndex >= songs.length) {
			currentSongIndex = 0;
		}
		updateSong();
	});

	function updateSong() {
		audio.src = `soungs/${songs[currentSongIndex].src}.mp3`;
		audio.play().catch(error => console.error("Error playing audio:", error));
		updatePlayButton();
		updateCurrentSongDiv();
	}

	function playNextSong() {
		currentSongIndex++;
		if (currentSongIndex >= songs.length) {
			currentSongIndex = 0;
		}
		updateSong();
	}

	// Add an event listener to detect user interaction
	document.addEventListener('click', () => {
		userHasInteracted = true;
	});

	function updateAudioSource() {
		audio.src = `soungs/${songs[currentSongIndex].src}.mp3`;
		if (userHasInteracted) {
			audio.play();
		}
}	

	      function displaySongsByArtist(artist) {
        const filteredSongs = songs.filter((song) =>
          song.title.includes(artist)
        );
        const songsContainer = document.getElementById("songsContainer");
        songsContainer.innerHTML = "";
        filteredSongs.forEach((song) => {
          const songDiv = document.createElement("div");
          songDiv.className = "mysong";
          songDiv.textContent = `${song.title} - ${song.duration}`;
          songDiv.addEventListener("click", function () {
            const audioElements = document.getElementsByClassName("myaudio");
            if (audioElements.length > 0) {
              const audio = audioElements[0];
              audio.src = `soungs/${song.src}.mp3`;
              audio.play().catch((error) => {
                console.error("Error playing audio:", error);
              });
            } else {
              console.error("Audio element not found");
            }
          });
          songsContainer.appendChild(songDiv);
        });
      }

        function copyPageURL() {
            var pageURL = window.location.href;
            var tempInput = document.createElement("input"); //بعمل عنصر علشان تخزن القيمة فيه
            tempInput.value = pageURL;
            document.body.appendChild(tempInput);
            /* حدد النص في العنصر */
            tempInput.select();
            tempInput.setSelectionRange(0, 99999); /*  جميع المتصفحات */
            /* نسخ النص إلى الحافظة */
            document.execCommand("copy");
            /* قم بإزالة العنصر النصي المخفي */
            document.body.removeChild(tempInput);
            alert("تم نسخ رابط الصفحة: " + pageURL);
        }

	// Initial setup
	updateAudioSource();
	updatePlayButton();
	updateCurrentSongDiv();
