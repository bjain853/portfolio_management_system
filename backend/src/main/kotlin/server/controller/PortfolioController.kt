package server.controller

import org.springframework.web.bind.annotation.*
import server.DTO.TransactionDTO
import server.entity.Portfolio
import server.service.ClientService
import server.service.PortfolioService
import java.util.*

@RestController
@RequestMapping("/api/portfolio")
class PortfolioController(
    private val portfolioService: PortfolioService,
    private val clientService: ClientService
) {

    @GetMapping
    fun getPortfolios(): List<Portfolio>? = portfolioService.getAllPortfolios()

    @GetMapping("/{id}")
    fun getPortfolioById(@PathVariable("id") portfolioId: UUID): Portfolio? =
        portfolioService.getPortfolioById(portfolioId)

    @PostMapping("/{id}")
    fun addNewTransaction(
        @PathVariable("id") portfolioId: UUID,
        @RequestBody securityInformation: TransactionDTO
    ): Boolean =
        portfolioService.addNewTransaction(portfolioId, securityInformation)

    @GetMapping("/client/{clientId}")
    fun getPortfolioByClientId(@PathVariable("clientId") clientId: UUID): Portfolio? {
        val client = clientService.getClientById(clientId)
        if (client != null)
            return portfolioService.getPortfolioByClient(client)
        return null
    }

    @GetMapping("/{id}/total")
    fun getPortfolioTotalSecurities(@PathVariable("id") portfolioId: UUID): Float? =
        portfolioService.getTotalProfitLossForPorfolio(portfolioId)


}