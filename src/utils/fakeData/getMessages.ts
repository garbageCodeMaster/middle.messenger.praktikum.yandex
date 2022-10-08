export function getMessages() {
  const size = 20;
  const messages = [];
  const messagesList = [
    {
      type: 'incoming',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elitdffhfjh Perspiciatis voluptates nobis mollitia porro libero! Neque earum quos culpa cupiditate voluptas nostrum nemo qui quisquam sapiente, deleniti adipisci officiis similique quia.',
      time: '12:34',
    },
    {
      type: 'outgoing',
      message: 'Lorem ipsudfgdf dfgdfg dfg m dolodfgdfg r sit amet, consectetur dfgdfg  adipidfgdfgdfgsicing elitdffhfjh Perspiciatis vodfgdfgdfgdfdfgdfluptates nobis mollitia porro libero! Neque earum quos culpa cupiditate voluptas nostrum nemo qui quisquam sapiente, deleniti adipisci officiis similique quia.',
      time: '12:34',
    },
  ];

  for (let i = 0; i < size; i++) {
    messages.push(messagesList[Math.floor(Math.random() * messagesList.length)]);
  }

  return messages;
}
