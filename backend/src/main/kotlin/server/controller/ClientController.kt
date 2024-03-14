package server.controller

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import server.entity.Client
import server.service.ClientInformation
import server.service.ClientService
import server.service.PortfolioService
import java.util.*


@RestController
@RequestMapping("/api/clients")
class ClientController(private val clientService: ClientService, private val portfolioService: PortfolioService) {

    @GetMapping
    fun getClients(): List<Client>? = clientService.getAllClients()

    @GetMapping("/{id}")
    fun getClientById(@PathVariable("id") clientId: UUID): Client? = clientService.getClientById(clientId)

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    fun addClient(@RequestBody clientInformation: ClientInformation): Client? = clientService.save(clientInformation)


}