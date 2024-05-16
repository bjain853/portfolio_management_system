package server.entity

import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.time.LocalDateTime
import java.util.*

@Entity
@Table(name = "securities")
class Security(

    @Enumerated(EnumType.STRING)
    val category: SecurityCategory,

    val name: String,
    val date: LocalDateTime = LocalDateTime.now(),
    val open: Float,
    val high: Float,
    val low: Float,
    val close: Float,
    val adjClose: Float,
    val volume: Float,

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    val id: UUID
)