package server.controller

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import server.entity.Client
import server.service.ClientService
import java.util.*

data class ClientInformation(
    val firstName:String,
    val lastName:String,
)

@RestController
@RequestMapping("/api/clients")
class ClientController(private val clientService: ClientService) {

    @GetMapping
    fun getClients(): List<Client>? = clientService.getAllClients()

    @GetMapping("/{id}")
    fun getClientById(@PathVariable("id") clientId: UUID): Client? = clientService.getClientById(clientId)

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    fun addClient(@RequestBody clientInformation) :


}