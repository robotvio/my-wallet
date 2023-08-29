import React from 'react';


interface ListProps {
    items: TransactionTableObject[];
}


const List: React.FC<ListProps> = ({ items }) => {
    return (
        <table className="item-list">
            <thead>
            <tr>
                <th>Type</th>
                <th>Direction</th>
                <th>symbol</th>
                <th>Amount</th>
                <th>Exchange Rate Unit</th>
                <th>Fee Amount</th>
                <th>From</th>
                <th>To</th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <tr key={item.walletId.S.toString()}>
                    <td>{item.type.S.toString()}</td>
                    <td>{item.direction.S.toString()}</td>
                    <td>{item.symbol.S.toString()}</td>
                    <td>{item.amount.N.toString()}</td>
                    <td>{item.exchangeRateUnit.S.toString()}</td>
                    <td>{item.feeAmount.N.toString()}</td>
                    <td>{item.sender.S.toString()}</td>
                    <td>{item.recipient.S.toString()}</td>
                </tr>
            ))}
            </tbody>
            <style jsx>{`
        .item-list {
          width: 100%;
          border-collapse: collapse;
          border: 1px solid #ccc;
          margin-top: 20px;
        }

        th, td {
          padding: 10px;
          text-align: left;
          border: 1px solid #ccc;
        }

        th {
          background-color: #f5f5f5;
        }
      `}</style>
        </table>
    );
};

export default List;