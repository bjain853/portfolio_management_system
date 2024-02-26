package server.service

import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.CrossOrigin
import server.entity.Client
import server.repository.ClientRepository

@Service
@CrossOrigin
class ClientService(val clientRepository: ClientRepository) {

    fun getAllClients(): List<Client>? = clientRepository.findAll()

    fun getClientById(id:Int) : Client? = clientRepository.getReferenceById(id)
}