package server.controller

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.*
import server.entity.Advisor
import server.service.AdvisorService


@RestController
@RequestMapping("/api/advisor")
class AdvisorController(private val advisorService: AdvisorService) {

    @GetMapping
    fun getAdvisors() : List<Advisor>? =  advisorService.getAllAdvisors()

    @GetMapping("/{id}")
    fun getAdvisorById(@PathVariable("id") advisorId: Int) : Advisor? = advisorService.getAdvisorById(advisorId)


}