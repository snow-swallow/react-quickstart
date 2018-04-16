import React from 'react';

let dataSource = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];
function grouping(products) {
    let groups = {};
    products.forEach(item => {
        let group = groups[item.category] || [];
        group.push(item);
        groups[item.category] = group;
    });
    return groups;
}

class ProductFilter extends React.Component {

    constructor (props) {
        super(props);
        this.state = { products: dataSource, keyword: '', showStocked: false };
        this.handleSearch = this.handleSearch.bind(this);
        this.handleShowStocked = this.handleShowStocked.bind(this);
    }

    handleSearch(e) {
        let word = e.target.value;
        this.setState({
            products: dataSource.filter(item => item.name.indexOf(word) > -1 ) || [],
            keyword: word
        });
    }

    handleShowStocked(e) {
        let onlyStocked = e.target.checked;
        this.setState({
            products: dataSource.filter(item => onlyStocked ? item.stocked === e.target.checked : true) || [],
            showStocked: e.target.checked
        });
    }

    render() {
        return (
            <div>
                <SearchInput keyword={this.state.keyword} handleSearch={this.handleSearch} />
                <ShowStock showStocked={this.state.showStocked} handleShowStocked={this.handleShowStocked}/>
                <ProductList products={this.state.products} />
            </div>
        );
    }

}

function ProductList(props) {
    let groups = grouping(props.products);
    let state = {titles: Object.keys(groups), itemsByGroup: groups};
    return (
        <section>
            <section>
                <span className="product-name">Name</span>
                <span>Price</span>
            </section>
            {
                state.titles.map(title => {
                    return <section key={title} className="product-group">
                        <div className="product-group-name">{title}</div>
                        {
                            state.itemsByGroup[title].map(item => {
                                return <div key={item.name} className={item.stocked? '': 'product-no-stock'}>
                                    <span className="product-name">{item.name}</span><span className="product-price">{item.price}</span>
                                </div>
                                })
                        }
                    </section>
                })
            }
        </section>
    )
}

class SearchInput extends React.Component {
    render() {
        return(
            <input type="text" value={this.props.keyword} onChange={this.props.handleSearch} />
        )
    };
}

class ShowStock extends React.Component {
    render() {
        console.log(this.props.showStocked);
        return (
            <div>
                <input id="checkEle" type="checkbox" onChange={this.props.handleShowStocked} checked={this.props.showStocked}/>
                <label htmlFor="checkEle">Only show products in stock</label>
            </div>
        )
    };
}

export default ProductFilter;