import React from 'react';
import pet from '@frontendmasters/pet';
import { navigate } from '@reach/router';
import Carrousel from './Carrousel';
import ErrorBoundary from './ErrorBoundary';
import ThemeContext from './ThemeContext';
import Modal from './Modal';

class Details extends React.Component {
  constructor(props) {
    // throw new Error('lol');
    super(props);
    this.state = {
      loading: true,
      showModal: false,
    };
  }

  componentDidMount() {
    const { id } = this.props;
    pet
      .animal(id)
      .then(({ animal }) => {
        this.setState({
          url: animal.url,
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false,
        });
      })
      .catch((err) => console.err(err));
  }

  // Use callback in setState when referencing the previous state
  toggleModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  adopt = () => {
    const { url } = this.state;
    navigate(url);
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <h1>loading...</h1>;
    }

    const { animal, name, location, description, breed, media, showModal } = this.state;

    return (
      <ThemeContext.Consumer>
        {([theme]) => (
          <div className="details">
            <Carrousel media={media} />
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div id="animal-about">
                <h4>about</h4>
                <p>{description}</p>
              </div>
              <div>
                <h1 style={{ color: theme }}>{name}</h1>
                <h2>{`${animal} - ${breed}, ${location}`}</h2>
                <button onClick={this.toggleModal} style={{ backgroundColor: theme }} type="button">
                  Adopt {name}
                </button>
              </div>
            </div>
            {showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adopt {name}?</h1>
                  <div className="buttons">
                    <button type="button" style={{ backgroundColor: theme }} onClick={this.adopt}>
                      Yes
                    </button>
                    <button type="button" style={{ backgroundColor: theme }} onClick={this.toggleModal}>
                      No, I am good...
                    </button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export default (props) => {
  return (
    <ErrorBoundary>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Details {...props} />
    </ErrorBoundary>
  );
};
