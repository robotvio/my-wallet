import React from 'react';


interface ListProps {
    items: ListItem[];
    onDelete: (id: string) => void;
    onDetails: (item: ListItem) => void;
}


const List: React.FC<ListProps> = ({ items, onDelete, onDetails }) => {
    return (
        <table className="item-list">
            <thead>
            <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {items.map(item => (
                <tr key={item.walletId.S.toString()}>
                    <td>{item.type.S.toString()}</td>
                    <td>{item.name.S.toString()}</td>
                    <td>{item.address.S.toString()}</td>
                    <td>
                        <button onClick={() => onDetails(item)}>Details</button>
                    </td>
                    <td>
                        <button onClick={() => onDelete(item.walletId.S.toString())}>Delete</button>
                    </td>
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