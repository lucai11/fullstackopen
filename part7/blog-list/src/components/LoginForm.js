import React from 'react'

const LoginForm = ({ username, password, setUsername, setPassword, handleLogin }) => (
    <div>
        <form onSubmit = { handleLogin }>
            <div>
                <label>Username: </label>
                <input id='username' type='text' value={username} name='Username'
                    onChange = { ({ target }) => setUsername(target.value) } />
            </div>
            <div>
                <label>Password: </label>
                <input id='password' type='text' value={password} name='Password'
                    onChange = { ({ target }) => setPassword(target.value) } />
            </div>
            <button id='submit-login' type = 'submit'>Login</button>
        </form>
    </div>
)

export default LoginForm