import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux
import { checkUserAuth } from '../../store/actions/user.actions';

// Components
import Login from './login/login.component';
import SignUp from './signup/signup.component';

import classes from './auth.styles.module.css';

const Auth = props => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// State
	const [showLoginForm, setShowLoginForm] = useState(true);
	const isAuth = useSelector(state => state.user.isAuth);

	// Effects
	useEffect(() => {
		const token = sessionStorage.getItem('token');

		dispatch(checkUserAuth(token));
	}, [dispatch]);

	useEffect(() => {
		if (isAuth) navigate('/');
	}, [isAuth, navigate]);

	// Handlers
	const showLoginHandler = () => {
		setShowLoginForm(true);
	};

	const showSignupHandler = () => {
		setShowLoginForm(false);
	};

	return (
		<Fragment>
			{showLoginForm ? (
				<Login showSignupForm={showSignupHandler} />
			) : (
				<SignUp showLoginForm={showLoginHandler} />
			)}
		</Fragment>
	);
};

export default Auth;
