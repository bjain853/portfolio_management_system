package server.service

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CrossOrigin
import server.entity.Client
import server.repository.ClientRepository
import java.util.*

@Service
@CrossOrigin
class ClientService(val clientRepository: ClientRepository) {

    fun getAllClients(): List<Client>? = clientRepository.findAll()

    fun getClientById(id: UUID): Client? = clientRepository.getReferenceById(id)

    fun getClientsByAdvisor(advisorId: UUID): List<Client> = clientRepository.findClientsByAdvisorId(advisorId)
}