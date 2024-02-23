document.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('form');
	const errorMessage = document.getElementById('error-message');
	const loginLink = document.querySelector('#nav-login');

	// Vérifier si le token est présent dans le localStorage
	const token = sessionStorage.getItem('token');

	if (token) {
	//***** Si token login = logout ******//
		loginLink.textContent = 'logout';
	}

	form.addEventListener('submit', async function(event) {
		event.preventDefault();

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

			// Stocker le token dans le localStorage
			sessionStorage.setItem('token', token);
			console.log('Token:', token);

			// Changer le texte du lien en "logout" après la connexion réussie
			loginLink.textContent = 'logout';

			// Rediriger vers une autre page ou effectuer d'autres actions
			window.location.href = '../index.html';
		} catch (error) {
            // console.error(error);
            // Affichage du message d'erreur
            errorMessage.removeAttribute('hidden');
            
		}
	});

	// Gérer la déconnexion lorsque l'utilisateur clique sur "logout"
	loginLink.addEventListener('click', function() {
		if (token) {
			sessionStorage.removeItem('token');
		}
	});
});