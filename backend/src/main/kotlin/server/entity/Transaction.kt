package server.entity

import com.fasterxml.jackson.annotation.JsonBackReference
import jakarta.persistence.*
import org.hibernate.annotations.JdbcTypeCode
import org.hibernate.type.SqlTypes
import java.time.LocalDateTime
import java.util.*


@Entity
@Table(name = "transactions")
class Transaction(

    var security_name: String,
    var price: Float,
    var quantity: Float,
    var date: LocalDateTime = LocalDateTime.now(),

    @Enumerated(EnumType.STRING)
    val transactionType: TransactionType,

    @ManyToOne
    @JoinColumn(name = "portfolio_id")
    @JsonBackReference
    var portfolio: Portfolio,

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(SqlTypes.VARCHAR)
    val id: UUID = UUID.randomUUID()
) {
}


