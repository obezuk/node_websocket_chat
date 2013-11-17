$(document).ready(function() {

	window.chat = (function() {

		chat = this;

		chat.socket = io.connect();

		chat.send = function(message, recipient) {

			data = {
				message : message,
				recipient : recipient || null
			}
		
		}

		chat.socket.on('message', function(data) {
			console.log(data);
		    // socket.emit('my other event', { my: 'data' });
		});

		$('#formMessage').submit(function() {

			event.preventDefault();

			message = $('#inputMessage').val();
			console.log(message);


		});
		
		return chat;
	
	})();

});