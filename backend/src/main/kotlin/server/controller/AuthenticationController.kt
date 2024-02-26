package server.controller

import org.springframework.http.HttpStatusCode
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController("/api/auth")
class AuthenticationController(private val authenticationManager:AuthenticationManager) {
    data class LoginRequestData(val username:String,val password:String)

    @PostMapping("/login")
    fun loginAdvisor(@RequestBody loginRequest: LoginRequestData):ResponseEntity<Void>{
        val authenticationRequest = UsernamePasswordAuthenticationToken.unauthenticated(
            loginRequest.username,loginRequest.password
        )
        val authenticationResponse = authenticationManager.authenticate(authenticationRequest)
        if(authenticationResponse.isAuthenticated){
            return ResponseEntity(HttpStatusCode.valueOf(200))
        }
        else{
            return ResponseEntity(HttpStatusCode.valueOf(401))
        }

    }

}


