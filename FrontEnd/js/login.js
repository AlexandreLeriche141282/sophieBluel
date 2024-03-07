document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('form');
	const errorMessage = document.getElementById('error-message');
	


	// **** Formulaire de connexion ***** //
	form.addEventListener('submit', async function(event) {
		event.preventDefault();
		console.log(event);
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value;


		try {
			const response = await fetch('http://localhost:5678/api/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password
				})
			});

			if (!response.ok) {
				throw new Error('Erreur lors de la connexion');
			}

			const data = await response.json();
			const token = data.token;

			// Stocker le token dans le sessionStorage
			sessionStorage.setItem('token', token);
			console.log('token:', token);

			

			// Rediriger vers une autre page ou effectuer d'autres actions
			window.location.href = '../index.html';
			
			
		} catch (error) {
            // console.error(error);
            // Affichage du message d'erreur
            errorMessage.removeAttribute('hidden');
            
		}
	});

	
});

