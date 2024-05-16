package server.controller

import jakarta.servlet.http.HttpServletResponse
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseCookie
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import server.DTO.AdvisorDTO
import server.DTO.LoginDTO
import server.DTO.SignUpDTO
import server.entity.Advisor
import server.service.AuthenticationService
import server.service.JWTService
import server.utils.toAdvisorDTO


@RestController
@RequestMapping("/api/auth")
class AuthenticationController(
    private val jwtService: JWTService,
    private val authenticationService: AuthenticationService
) {

    private val log: Logger = LoggerFactory.getLogger(AuthenticationService::class.java)

    @GetMapping("/isAuthenticated")
    fun checkLoggedInUser(): ResponseEntity<Void> {
        return ResponseEntity.status(HttpStatus.OK).build()
    }

    @PostMapping("/login")
    fun loginAdvisor(@RequestBody loginUserInfo: LoginDTO, response: HttpServletResponse): ResponseEntity<AdvisorDTO> {
        val authenticatedUser: Advisor = authenticationService.authenticate(loginUserInfo)
        val cookie: ResponseCookie =
            ResponseCookie.from("token", jwtService.generateToken(authenticatedUser)) // key & value
                .domain("localhost")
                .path("/")
                .maxAge(jwtService.getExpirationDuration().toLong())
                .build()
        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString())
        return ResponseEntity.ok(authenticatedUser.toAdvisorDTO())
    }

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    fun signupAdvisor(@RequestBody signUpInfo: SignUpDTO): ResponseEntity<Void> {
        log.info("Request to create a new advisor")
        authenticationService.signup(signUpInfo)
        return ResponseEntity.status(HttpStatus.CREATED).build()
    }
}
