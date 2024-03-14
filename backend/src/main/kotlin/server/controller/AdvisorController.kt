package server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import server.DTO.AdvisorDTO
import server.entity.Advisor
import server.entity.Client
import server.service.AdvisorService
import server.service.ClientService
import server.toAdvisorDTO
import java.util.*


@RestController
@RequestMapping("/api/advisors")
class AdvisorController(private val advisorService: AdvisorService, private val clientService: ClientService) {

    @GetMapping
    fun getAdvisors(): List<Advisor>? = advisorService.getAllAdvisors()

    @GetMapping("/{id}")
    fun getAdvisorById(@PathVariable("id") advisorId: UUID): AdvisorDTO =
        advisorService.getAdvisorById(advisorId).toAdvisorDTO()

    @GetMapping("/{id}/clients")
    fun getClientsByAdvisorId(@PathVariable("id") advisorId: UUID): List<Client>? =
        clientService.getClientsByAdvisorId(advisorId)
}