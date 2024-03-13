package server.repository

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import server.entity.Security
import java.util.*

@Repository
interface SecurityRepository : JpaRepository<Security, UUID>