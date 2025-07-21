document.querySelector('#search-btn').addEventListener('click', () => {
  document.querySelector('#error-message').textContent = ''
  
  const [artist, title] = document.querySelector('#song-details').value.split(',').map(s => s.trim())
  console.log(artist + title)
  
  if (!artist || !title) {
    document.querySelector('#error-message').textContent = 'Use the correct format: Artist, Song'
    return
  }
  
  document.querySelector('#loader').classList.remove('d-none')
  document.querySelector('#loader').classList.add('d-flex')
  
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
  .then(response => response.json())
  .then(data => {
    if (data.lyrics) {
      console.log(data)
      document.querySelector('#loader').classList.remove('d-flex')
      document.querySelector('#loader').classList.add('d-none')
      document.querySelector('.lyrics').classList.remove('d-none')
      document.querySelector('.lyrics').classList.add('box-shadow')
      document.querySelector('.lyrics').textContent = data.lyrics
    } else {
      document.querySelector('#error-message').textContent = 'Lyrics not found!'
    }
  })
  .catch(error => {
    document.querySelector('#error-message').textContent = 'Error fetching lyrics. Try again!'
    console.error(error)
  })
})