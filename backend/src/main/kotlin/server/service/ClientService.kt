package server.service

import org.springframework.dao.DuplicateKeyException
import org.springframework.stereotype.Service
import server.entity.Client
import server.entity.Portfolio
import server.repository.ClientRepository
import java.util.*

data class ClientInformation(
    val firstName: String,
    val lastName: String,
    val advisorId: UUID,
    val portfolio: Portfolio?
)

@Service
class ClientService(
    private val clientRepository: ClientRepository, private val advisorService: AdvisorService,
    private val portfolioService: PortfolioService
) {

    fun getAllClients(): List<Client>? = clientRepository.findAll()

    fun getClientById(id: UUID): Client? = clientRepository.getReferenceById(id)

    fun getClientsByAdvisorId(advisorId: UUID): List<Client>? =
        getAllClients()?.filter { client: Client -> client.advisor.id == advisorId }

    fun save(clientInformation: ClientInformation): Client? {
        // Cannot have clients with same name
        if (clientRepository.findByFirstNameAndLastName(
                clientInformation.firstName,
                clientInformation.lastName
            ) != null
        ) {
            throw DuplicateKeyException(
                String.format(
                    "Client  with name %s %s already exists",
                    clientInformation.firstName, clientInformation.lastName
                )
            )
        }

        val advisor = advisorService.getAdvisorById(clientInformation.advisorId)
        val newClient = Client(
            firstName = clientInformation.firstName,
            lastName = clientInformation.lastName,
            advisor = advisor,
            portfolio = null
        )
        val clientSaved = clientRepository.save(newClient)
        val createdPortfolio = portfolioService.save(clientSaved)
        clientSaved.portfolio = createdPortfolio
        return clientRepository.save(clientSaved)
    }
}