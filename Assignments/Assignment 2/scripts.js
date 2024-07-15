function addParticipant() {
    const event = document.getElementById('event').value;
    const name = document.getElementById('name').value;

    if (event && name) {
        const list = document.getElementById(`${event}-list`);
        const listItem = document.createElement('li');
        listItem.textContent = name;
        list.appendChild(listItem);

        // Clear input fields
        document.getElementById('event').value = '';
        document.getElementById('name').value = '';
    } else {
        alert('Please choose an event and enter your name.');
    }
}
