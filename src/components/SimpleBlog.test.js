import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
    it('renders title, author and likes', () => {
        const simpleBlog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: "Luukkaisen Matti",
            likes: 11234
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} />)

        const titleAndAuthorDiv = simpleBlogComponent.find('.titleAndAuthor')
        const likesDiv = simpleBlogComponent.find('.likes')

        expect(titleAndAuthorDiv.text()).toContain(simpleBlog.title)
        expect(titleAndAuthorDiv.text()).toContain(simpleBlog.author)
        expect(likesDiv.text()).toContain(simpleBlog.likes)
    })

    it('two button clicks -> two calls to handler', () => {
        const simpleBlog = {
            title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
            author: "Luukkaisen Matti",
            likes: 11234
        }

        const mockHandler = jest.fn()

        const simpleBlogComponent = shallow(<SimpleBlog blog={simpleBlog} onClick={mockHandler}
        />)

        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)
    })
})