document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const waveContainer = document.getElementById('waveContainer');
    const audio = document.getElementById('audio');
  
    startButton.addEventListener('click', () => {
      // Hide the button
      startButton.style.display = 'none';
  
      // Show the wave container
      waveContainer.style.visibility = 'visible';
  
      // Animate waves
      const waves = document.querySelectorAll('.wave');
      waves.forEach((wave) => {
        wave.style.animationPlayState = 'running';
      });
  
      // Play audio
      audio.play().catch(error => {
        console.log('Audio play was prevented:', error);
      });
  
      audio.onended = () => {
        // Stop wave animation after audio ends
        waves.forEach((wave) => {
          wave.style.animationPlayState = 'paused';
        });
      };
    });
  });
  