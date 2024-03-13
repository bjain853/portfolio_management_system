package server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import server.entity.Client
import server.service.ClientService
import java.util.*

@RestController
@RequestMapping("/api/clients")
class ClientController(private val clientService: ClientService) {

    @GetMapping
    fun getClients(): List<Client>? = clientService.getAllClients()

    @GetMapping("/{id}")
    fun getClientById(@PathVariable("id") clientId: UUID): Client? = clientService.getClientById(clientId)


}