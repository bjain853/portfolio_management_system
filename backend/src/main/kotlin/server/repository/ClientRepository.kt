package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import server.entity.Client
import server.entity.Portfolio
import java.util.*

@Repository
interface ClientRepository : JpaRepository<Client, UUID> {

    fun findByFirstNameAndLastName(firstName: String, lastName: String): Client?
    
}

