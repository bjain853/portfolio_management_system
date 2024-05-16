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
    private val clientRepository: ClientRepository,
    private val portfolioService: PortfolioService,
    private val advisorService: AdvisorService
) {

    fun getAllClients(): List<Client>? = clientRepository.findAll()

    fun getClientById(id: UUID): Client? = clientRepository.getReferenceById(id)

    fun getClientProfitLoss(client:Client) = portfolioService.getPortfolioProfit(client.portfolio.id)

    fun getClientsByAdvisorId(advisorId: UUID): List<Client>? =
        getAllClients()?.filter { client: Client -> client.advisor.id == advisorId }

    fun save(clientInformation: ClientInformation): Client {
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

        val newPortfolio = Portfolio(
            transactions = null,
            client = null,
        )
        val savedPortfolio = portfolioService.save(newPortfolio) // portfolio with date and id
        val newClient = Client(
            firstName = clientInformation.firstName,
            lastName = clientInformation.lastName,
            advisor = advisorService.getAdvisorById(clientInformation.advisorId),
            portfolio = savedPortfolio
        )
        val savedClient =  clientRepository.save(newClient)
        savedPortfolio.client = savedClient
        portfolioService.save(savedPortfolio)
        return savedClient
    }
}