package server.DTO

data class LoginDTO(val username: String, val password: String)

data class SignUpDTO(val username: String, val password: String, val firstName: String, val lastname: String)

