let intervalId = 0;

document.getElementById('schoolForm').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById('contDiv').style.display = 'block';
  document.getElementById('schoolForm').style.display = 'none';
  document.getElementById('apiButton').style.display = 'block';
});

document.getElementById('apiButton').addEventListener('click', function() {
  document.getElementById('apiButton').style.backgroundColor = 'red';
  var text = document.getElementById('response');
  text.innerHTML = 'Your School pressed the button';

  function fetchData() {
    fetch('https://x9820t27-4000.asse.devtunnels.ms/data')
      .then(response => response.json())
      .then(data => {
        let results = document.getElementById('results');
        let el = document.getElementById('exist');
        if (!el) {
          el = document.createElement('div');
          el.id = 'exist';
          results.appendChild(el);
        }
        let t1 = '';
        let counter = 1; // Initialize counter
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            t1 += `${counter}. School: ${key}, Time: ${data[key]}<br>`;
            counter++; // Increment counter
          }
        }
        el.innerHTML = t1;
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  

  if (!intervalId) {
    intervalId = setInterval(fetchData, 500);
  }

  setTimeout(function() {
    document.getElementById('apiButton').style.backgroundColor = 'blue';
  }, 8000);

  document.getElementById('apiButton').disabled = true;

  setTimeout(function() {
    document.getElementById('apiButton').disabled = false;
  }, 10000);

  setTimeout(function() {
    text.innerHTML = '';
  }, 10000);

  const schoolName = document.getElementById('schoolName').value;

  fetch('https://x9820t27-4000.asse.devtunnels.ms/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ school: schoolName }),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch((error) => {
    console.error('Error:', error);
  });
});
