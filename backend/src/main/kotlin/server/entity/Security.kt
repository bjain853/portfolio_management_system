package server.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.time.LocalDateTime
import java.util.*


@Entity
@Table(name = "security")
class Security(

    val name: String,

    @Enumerated(EnumType.STRING)
    val category: SecurityCategory,

    var purchasePrice: Float,

    var purchaseDate: LocalDateTime,

    var quantity: Float,

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonBackReference
    var portfolio: Portfolio,

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    private val id: UUID
) {
}


