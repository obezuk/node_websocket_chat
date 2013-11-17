$(document).ready(function() {

	window.chat = (function() {

		chat = this;

		chat.socket = io.connect();

		chat.send = function(message, recipient) {

			data = {
				message : message,
				recipient : recipient || null
			}

			console.log('Sending Message');

			chat.socket.emit('message', data);
		
		}

		chat.socket.on('message', function(data) {
			console.log('Received Message');
			console.log(data);

			dt = $('<dt></dt>').html(data.sender);
			dd = $('<dd></dd>').html(data.message);

			$('#listMessages').append(dt);
			$('#listMessages').append(dd);

		    // socket.emit('my other event', { my: 'data' });
		});

		$('#formMessage').submit(function() {

			event.preventDefault();

			message = $('#inputMessage').val();

			$('#inputMessage').val('');
			// console.log(message);

			chat.send(message);

		});

		$("formMessage > input,select,textarea").not("[type=submit]").jqBootstrapValidation({

		}); // Validation
		
		return chat;
	
	})();

});