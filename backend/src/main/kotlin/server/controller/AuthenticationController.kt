package server.controller

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.dao.DuplicateKeyException
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController
import server.DTO.AdvisorDTO
import server.DTO.LoginDTO
import server.DTO.SignUpDTO
import server.entity.Advisor
import server.service.AdvisorService
import server.toAdvisor
import server.toAdvisorDTO

@RestController("/api/auth")
class AuthenticationController(
    private val authenticationManager: AuthenticationManager,
    private val advisorService: AdvisorService
) {

    private val log: Logger = LoggerFactory.getLogger(GlobalErrorController::class.java)

    @PostMapping("/login")
    fun loginAdvisor(@RequestBody loginRequest: LoginDTO): ResponseEntity<AdvisorDTO> {
        val authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(
            loginRequest.username, loginRequest.password
        )
        log.info("Request login with username {}", loginRequest.username)
        val authenticationResponse = authenticationManager.authenticate(authenticationRequest)

        if (authenticationResponse.isAuthenticated) {
            val advisor: Advisor? = advisorService.loadUserByUsername(loginRequest.username)
            if (advisor != null) return ResponseEntity.ok(advisor.toAdvisorDTO())
        }
        return ResponseEntity.notFound().build()
    }


    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    fun signupAdvisor(@RequestBody signUpRequest: SignUpDTO): ResponseEntity<AdvisorDTO> {
        log.info(
            "Request signup with username {}, name {} {}",
            signUpRequest.username,
            signUpRequest.firstName,
            signUpRequest.lastname
        )
        if (advisorService.hasAdvisorWithEmail(signUpRequest.username) != null) {
            throw DuplicateKeyException(
                java.lang.String.format(
                    "Username %s is already been used",
                    signUpRequest.username
                )
            )
        }

        val advisorDto = signUpRequest.toAdvisorDTO()
        val advisor: Advisor = advisorService.save(advisorDto.toAdvisor()) // doesn't have an ID
        return ResponseEntity.ok(advisor.toAdvisorDTO()) // should have an id after being saved

    }
}
