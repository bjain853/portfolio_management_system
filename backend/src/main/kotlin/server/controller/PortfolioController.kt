package server.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import server.entity.Portfolio
import server.service.PortfolioService
import java.util.*

@RestController
@RequestMapping("/api/portfolio")
class PortfolioController(private val portfolioService: PortfolioService) {

    @GetMapping
    fun getPortfolios(): List<Portfolio>? = portfolioService.getAllPortfolios()

    @GetMapping("/{id}")
    fun getPortfolioById(@PathVariable("id") portfolioId: UUID): Portfolio? =
        portfolioService.getPortfolioById(portfolioId)

    @GetMapping("/client/{id}")
    fun getPortfolioByClientId(@PathVariable("id") clientId: UUID): Portfolio? =
        portfolioService.getPortfolioByClientId(clientId)


    @GetMapping("/{id}/total")
    fun getPortfolioTotalSecurities(@PathVariable("id") portfolioId: UUID): Float =
        portfolioService.getTotalPortfolioSecurities(portfolioService.getPortfolioById(portfolioId))


}