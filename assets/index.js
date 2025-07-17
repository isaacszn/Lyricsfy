document.querySelector('#search-btn').addEventListener('click', () => {
  document.querySelector('#error-message').textContent = ''
  
  const [artist, title] = document.querySelector('#song-details').value.split(',').map(s => s.trim())
  console.log(artist + title)
  
  if (!artist || !title) {
    document.querySelector('#error-message').textContent = 'Use the correct format: Artist, Song'
    return
  }
  
  //const snippet = 'Is it a crime, baby baby, baby sunmomi you know say you match my steeze'
  //const apiKey = '8a80bde9a41ac07cdcdba471db7cd10c'
  
  
  fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
  .then(response => response.json())
  .then(data => {
    if (data.lyrics) {
      console.log(data)
      document.querySelector('.lyrics').classList.remove('d-none')
      document.querySelector('.lyrics').classList.add('d-flex')
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