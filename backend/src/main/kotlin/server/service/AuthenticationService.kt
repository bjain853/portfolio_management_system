package server.service

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import server.DTO.LoginDTO
import server.DTO.SignUpDTO
import server.entity.Advisor

@Service
class AuthenticationService(
    private val advisorService: AdvisorService,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager
) {
    fun signup(input: SignUpDTO): Advisor {
        val newAdvisor = Advisor(
            firstName = input.firstName,
            lastName = input.lastname,
            email = input.username,
            hashed_password = passwordEncoder.encode(input.password).toString()
        )
        return advisorService.save(newAdvisor)
    }

    fun authenticate(input: LoginDTO): Advisor {
        authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(
                input.username,
                input.password
            )
        )
        return advisorService.getAdvisorWithEmail(input.username)!!
    }
}